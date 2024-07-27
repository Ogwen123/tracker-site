export const url = (type: "auth" | "tracker") => {
    let env;

    if (location.origin.includes("localhost") || location.origin.includes("127.0.0.1")) {
        env = "dev"
    } else {
        env = "prod"
    }

    if (type === "auth") {
        if (env === "prod") {
            return "https://auth.owen-services.eu.org/api/"
        } else {
            return "http://localhost:3000/api/"
        }
    } else {
        if (env === "prod") {
            return "https://tracker-api.owen-services.eu.org/api/"
        } else {
            return "http://localhost:3004/api/"
        }
    }
}