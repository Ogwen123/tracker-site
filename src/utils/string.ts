export const title = (str: string) => {
    let buffer = "";

    for (let i of str.split(" ")) {
        buffer += i[0].toUpperCase() + i.substring(1).toLowerCase();
    }

    return buffer;
};

export const formatTaskName = (name: string) => {
    const LENGTH_LIMIT = 18;

    if (name.length >= LENGTH_LIMIT) {
        return name.substring(0, LENGTH_LIMIT - 1) + "...";
    } else {
        return name;
    }
};
