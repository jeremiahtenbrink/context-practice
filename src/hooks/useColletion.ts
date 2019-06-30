import { useEffect, useState } from "react";

const useCollection = (ref) => {
    // create a place to put the data
    const [docState, setDocState] = useState({
        isLoading: true,
        data: null
    });
    
    // call on component did mount.
    useEffect(() => {
        // call snapshot on the ref and store the unsubscribe function.
        const unsubscribe =  ref.onSnapshot(docs => {
            const docsObject = {};
            docs.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                docsObject[doc.id] = data;
            });
            setDocState({
                isLoading: false,
                data: docsObject
            });
        });
        // call unsubscribe on component did unmount.
        return () => unsubscribe();
    }, []);
    
    return docState;
};
