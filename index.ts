import axios from "axios";
const base_url = "https://easysms.devs.ly/sms/api";

type SendSmsOpts = {
    text: string;
    to: string;
};

async function send(params: SendSmsOpts) {
    if (params.to.startsWith("+218")) {
        params.to = params.to.slice(4);
    }
    if (params.to.startsWith("00218")) {
        params.to = params.to.slice(5);
    }
    if (params.to.startsWith("0")) {
        params.to = params.to.slice(1);
    }

    const body = {
        params: {
            action: "send-sms",
            api_key: process.env.NODE_ENV === "test" ? "---" : "YWRtaW46TWFoYXR0YQ==",
            unicode: 1,
            to: params.to,
            sms: params.text,
        },
    };

    console.log("Sending SMS message ", params);

    await (axios as any).get(base_url, body);
}

export default {
    send,
};
