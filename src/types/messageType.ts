export type Button = {
    text: string;
    action: () => void;
};

export type MenuList = {
    title: string;
    buttons: Button[];
};

export type BaseMessage = {
    id: string;
    sender: "user" | "bot";
    timestamp: number;
};

export type TextMessage = BaseMessage & {
    type: "text";
    content: string;
};

export type ButtonListMessage = BaseMessage & {
    type: "buttonList";
    buttons: Button[];
};

export type MenuListMessage = BaseMessage & {
    type: "menuList";
    menu: MenuList[];
};

export type MessageType = TextMessage | ButtonListMessage | MenuListMessage;
