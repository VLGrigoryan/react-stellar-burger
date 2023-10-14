import { getCookie } from "./cookie";
const wsUrl = "wss://norma.nomoreparties.space";

export const getWebSocketUrl = (isUser: boolean): string => {
    const token = getCookie("token");
    if (isUser) {
        return `${wsUrl}/orders?token=${token}`;
    } else {
        return `${wsUrl}/orders/all`;
    }
};