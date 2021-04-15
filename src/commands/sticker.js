/* eslint-disable no-undef */
const { decryptMedia } = require("@open-wa/wa-decrypt");
const { exec } = require("child_process");
const fs = require("fs");


exports.run = async (client, message) => {
    if (message.isMediaObj && message.type === "image") {
        const waiting = await client.reply(message.from, "_⌛ Please wait..._", message.id);
        const media = await decryptMedia(message.isMediaObj, uaOverride);
        client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${media.toString("base64")}`, {
            author: message.sender.pushname,
            pack: "WABot"
        });
        date = new Date();
        console.log(`[DEBUG] Sticker was generated in ${date}`);
    } else if (message.quotedMsgObj && message.quotedMsgObj.type === "image") {
        const waiting = await client.reply(message.from, "_⌛ Please wait..._", message.id);
        const media = await decryptMedia(message.quotedMsgObj);
        client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${media.toString("base64")}`, {
            author: message.sender.pushname,
            pack: "WABot"
        });
        date = new Date();
        console.log(`[DEBUG] Sticker was generated in ${date}`);

    } else if ((message.isMedia || message.isGif) || (message.mimetype === "video/mp4" || message.mimetype === "image/gif") || message.type === "video") {
        if (message.duration > 6) { return client.reply(message.from, "❎ Your attachment is too long", message.id); }
        client.reply(message.from, "_⌛ Please wait..._", message.id);
        const mediaData = await decryptMedia(message);
        const filename = `./assets/stickers/sticker.mp4`;

        fs.writeFileSync(filename, mediaData);

        try {
            exec(`gify ./assets/stickers/sticker.mp4 ./assets/stickers/output.gif --fps=60 --scale=240:-1`, async (error, stdout, stderr) => {
                const gif = fs.readFileSync("./assets/stickers/output.gif", { encoding: "base64" });
                let strSize = fs.statSync("./assets/stickers/output.gif", { encoding: "base64" });
                let size = parseInt(strSize.size);

                await client.reply(message.from, `Image size: ${size}`, message.id);
                if (size <= 1500000) {

                    client.sendImageAsSticker(message.from, `data:image/gif;base64, ${gif.toString("base64")}`, {
                        author: message.sender.pushname,
                        pack: "WABot"
                    });
                    date = new Date();
                    console.log(`[DEBUG] Animated Sticker was generated in ${date}`);
                    return;
                } else if (size > 1500000 && size <= 4000000) {
                    exec(`gify ./assets/stickers/sticker.mp4 ./assets/stickers/output.gif --fps=28 --scale=144:-1`, async (error, stdout, stderr) => {
                        const gif = fs.readFileSync("./assets/stickers/output.gif", { encoding: "base64" });


                        client.sendImageAsSticker(message.from, `data:image/gif;base64, ${gif.toString("base64")}`, {
                            author: message.sender.pushname,
                            pack: "WABot"
                        });
                    });
                    date = new Date();
                    console.log(`[DEBUG] Animated Sticker was generated in ${date}`);
                    return;
                } else if (size > 1500000 && size <= 8500000) {
                    exec(`gify ./assets/stickers/sticker.mp4 ./assets/stickers/output.gif --fps=20 --scale=72:-1`, async (error, stdout, stderr) => {
                        const gif = fs.readFileSync("./assets/stickers/output.gif", { encoding: "base64" });

                        client.sendImageAsSticker(message.from, `data:image/gif;base64, ${gif.toString("base64")}`, {
                            author: message.sender.pushname,
                            pack: "WABot"
                        });
                    });
                    date = new Date();
                    console.log(`[DEBUG] Animated Sticker was generated in ${date}`);
                    return;
                } else if (size > 850000) {
                    return client.reply(message.from, "❎ Your attachment is too Heavy", message.id);
                }
            });
        } catch (error) {
            client.reply(message.from, "Error", message.id);
        }

    } else if ((message.quotedMsgObj.isMedia || message.quotedMsgObj.isGif) || (message.quotedMsgObj.mimetype === "video/mp4" || message.quotedMsgObj.mimetype === "image/gif") || message.quotedMsgObj.type === "video") {
        if (message.quotedMsgObj.duration > 6) { return client.reply(message.from, "❎ Your attachment is too long", message.id); }
        client.reply(message.from, "_⌛ Please wait..._", message.id);
        const mediaData = await decryptMedia(message.quotedMsgObj);
        const filename = `./assets/stickers/sticker.mp4`;

        fs.writeFileSync(filename, mediaData);

        try {
            exec(`gify ./assets/stickers/sticker.mp4 ./assets/stickers/output.gif --fps=60 --scale=240:-1`, async (error, stdout, stderr) => {
                const gif = fs.readFileSync("./assets/stickers/output.gif", { encoding: "base64" });
                let strSize = fs.statSync("./assets/stickers/output.gif", { encoding: "base64" });
                let size = parseInt(strSize.size);

                await client.reply(message.from, `Image size: ${size}`, message.id);
                if (size <= 1500000) {

                    client.sendImageAsSticker(message.from, `data:image/gif;base64, ${gif.toString("base64")}`, {
                        author: message.sender.pushname,
                        pack: "WABot"
                    });
                    date = new Date();
                    console.log(`[DEBUG] Animated Sticker was generated in ${date}`);
                    return;
                } else if (size > 1500000 && size <= 4000000) {
                    exec(`gify ./assets/stickers/sticker.mp4 ./assets/stickers/output.gif --fps=28 --scale=144:-1`, async (error, stdout, stderr) => {
                        const gif = fs.readFileSync("./assets/stickers/output.gif", { encoding: "base64" });


                        client.sendImageAsSticker(message.from, `data:image/gif;base64, ${gif.toString("base64")}`, {
                            author: message.sender.pushname,
                            pack: "WABot"
                        });
                    });
                    date = new Date();
                    console.log(`[DEBUG] Animated Sticker was generated in ${date}`);
                    return;
                } else if (size > 1500000 && size <= 8500000) {
                    exec(`gify ./assets/stickers/sticker.mp4 ./assets/stickers/output.gif --fps=20 --scale=72:-1`, async (error, stdout, stderr) => {
                        const gif = fs.readFileSync("./assets/stickers/output.gif", { encoding: "base64" });

                        client.sendImageAsSticker(message.from, `data:image/gif;base64, ${gif.toString("base64")}`, {
                            author: message.sender.pushname,
                            pack: "WABot"
                        });
                    });
                    date = new Date();
                    console.log(`[DEBUG] Animated Sticker was generated in ${date}`);
                    return;
                } else if (size > 850000) {
                    return client.reply(message.from, "❎ Your attachment is too Heavy", message.id);
                }
            });
        } catch (error) {
            client.reply(message.from, "Error", message.id);
        }
    } else {
        client.reply(message.from, "❎ Please caption/quote some picture!", message.id);
    }
};