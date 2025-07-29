import { usePageContext } from "./usePageContext"

const useData = <Data,>(): Data => {
    const { data } = usePageContext();
    return data as Data;
};

export { useData }