const serverResponse = async (configData) => {
    try {
        const response = await fetch(configData.url, {
            method: configData.method,
            headers: configData.headers,
            body: JSON.stringify(configData.body),
          })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || errorData.msg);
        }
        return response.json()
    } catch (err) {
        throw err
    }
}

export default serverResponse