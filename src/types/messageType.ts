export type BaseMessage = {
    id: string;
    sender: "user" | "bot";
    content: string;
    url?: {link: string, text: string};
    question?: string;
    timestamp: number;
};

export type TextMessage = BaseMessage & {
    type: "text";
};

export type ButtonListMessage = BaseMessage & {
    type: "buttonList";
    buttons: string[];
};

export type MenuList = {
    title: string;
    buttons: string[];
};

export type MenuListMessage = BaseMessage & {
    type: "menuList";
    menu: MenuList[];
};

export type MessageType = TextMessage | ButtonListMessage | MenuListMessage;
