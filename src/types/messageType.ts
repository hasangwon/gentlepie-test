export type BaseMessage = {
    id: string;
    sender: "user" | "bot";
    content: string;
    url?: { link: string, text: string };
    question?: string;
    timestamp: number;
};

export type TextMessage = BaseMessage & {
    type: "text" | "loading";
};

export type ButtonListMessage = BaseMessage & {
    type: "buttonList" | "loading";
    buttons: string[];
};

export type MenuList = {
    title: string;
    buttons: string[];
};

export type MenuListMessage = BaseMessage & {
    type: "menuList" | "loading";
    menu: MenuList[];
};

export type MessageType = TextMessage | ButtonListMessage | MenuListMessage | any;
