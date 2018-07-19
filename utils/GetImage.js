const server_base = ''

export default GetImage = (image_name, size) => {
    return `${server_base}/${size}/${image_name}`
}