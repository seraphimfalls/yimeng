export function createFormData(data) {
    if (data) {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.set(key, data[key]);
        });
        return formData;
    }
    return null;
}
