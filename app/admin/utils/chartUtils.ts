export const generateVisitorData = (days: number) => {
    const data = [];
    const labels = [];
    const today = new Date();

    for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        // Định dạng ngày theo DD/MM
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        labels.push(`${day}/${month}`);

        // Tạo số lượng người truy cập ngẫu nhiên từ 100 đến 1000
        data.push(Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
    }

    return { labels, data };
};
