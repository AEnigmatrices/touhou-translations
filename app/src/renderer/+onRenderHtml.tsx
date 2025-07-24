import { escapeInject, dangerouslySkipEscape } from "vike/server";
import htmlTemplate from "./index.html?raw";

const onRenderHtml = async () => escapeInject`${dangerouslySkipEscape(htmlTemplate)}`;

export { onRenderHtml }