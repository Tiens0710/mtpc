import { NextResponse } from 'next/server';
import { RpcProvider } from 'starknet';

const NFT_CONTRACT = '0x07d8d2ef74a887a268a5b4793db7d36e2ae229651c641520a05646ad923081cb';
const RPC_URL = 'https://api.cartridge.gg/x/starknet/sepolia';
const VOYAGER_NFT_BASE = 'https://sepolia.voyager.online/nft';
const IPFS_GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
];

/** Decode a Cairo ByteArray (serialised as felt array) into a UTF-8 string. */
function decodeByteArray(felts: string[]): string {
  const dataLen = Number(BigInt(felts[0]));
  const chunks = felts.slice(1, 1 + dataLen);
  const pendingWord = felts[1 + dataLen];
  const pendingLen = Number(BigInt(felts[2 + dataLen]));

  let str = '';
  for (const chunk of chunks) {
    const hex = chunk.replace('0x', '').padStart(62, '0');
    for (let i = 0; i < 62; i += 2)
      str += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
  }
  if (pendingLen > 0) {
    const hex = pendingWord.replace('0x', '').padStart(pendingLen * 2, '0');
    for (let i = 0; i < pendingLen * 2; i += 2)
      str += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
  }
  return str;
}

/** Convert ipfs:// URI to an HTTP gateway URL. */
function ipfsToHttp(uri: string, gateway = IPFS_GATEWAYS[0]): string {
  if (uri.startsWith('ipfs://')) return gateway + uri.slice(7);
  return uri;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const contract = url.searchParams.get('contract') || NFT_CONTRACT;
    const tokenIdStr = url.searchParams.get('tokenId');

    if (!tokenIdStr) {
      return NextResponse.json({ success: false, error: 'Missing tokenId' }, { status: 400 });
    }

    const voyagerUrl = `${VOYAGER_NFT_BASE}/${contract}/${tokenIdStr}`;

    // uint256 calldata for the token ID
    const tokenIdNum = BigInt(tokenIdStr);
    const low = '0x' + (tokenIdNum & BigInt('0xffffffffffffffffffffffffffffffff')).toString(16);
    const high = '0x' + (tokenIdNum >> BigInt(128)).toString(16);

    const provider = new RpcProvider({ nodeUrl: RPC_URL });

    // ── 1. get_nft_metadata → ByteArray → IPFS URI ────────────────────────
    let name: string | undefined;
    let description: string | undefined;
    let image: string | undefined;
    let attributes: Record<string, string> | undefined;

    const metaRes: string[] = await provider.callContract({
      contractAddress: contract,
      entrypoint: 'get_nft_metadata',
      calldata: [low, high],
    });

    const ipfsUri = decodeByteArray(metaRes);

    // ── 2. Fetch IPFS metadata JSON ────────────────────────────────────────
    for (const gateway of IPFS_GATEWAYS) {
      try {
        const ipfsRes = await fetch(ipfsToHttp(ipfsUri, gateway), {
          signal: AbortSignal.timeout(10000),
        });
        if (!ipfsRes.ok) continue;

        const meta = await ipfsRes.json() as {
          name?: string;
          description?: string;
          image?: string;
          attributes?: { trait_type: string; value: string }[];
        };

        name = meta.name;
        description = meta.description;
        image = meta.image ? ipfsToHttp(meta.image) : undefined;
        if (meta.attributes?.length) {
          attributes = Object.fromEntries(
            meta.attributes.map(a => [a.trait_type, String(a.value)])
          );
        }
        break;
      } catch { continue; }
    }

    // ── 3. owner_of ───────────────────────────────────────────────────────
    let owner: string | undefined;
    try {
      const ownerRes: string[] = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'owner_of',
        calldata: [low, high],
      });
      if (ownerRes?.[0]) owner = '0x' + BigInt(ownerRes[0]).toString(16);
    } catch { /* ignore */ }

    // Fallback name
    if (!name) name = `MTPC Certificate #${tokenIdStr}`;

    return NextResponse.json(
      { success: true, voyagerUrl, tokenId: tokenIdStr, contract, name, description, image, owner, attributes },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
