import {useState, useEffect} from 'react';

export const useDoc = (ref):[boolean, any] => {
    // create stat hook to store the firebase data
    const [docState, setDocState] = useState({
        isLoading: true,
        data: null
    });
    
    useEffect(() => {
        // subscribe to document and store function to unsubscribe to doc.
        const unsubscribe = ref.onSnapshot(doc => {
            // set data to the document
            const data = doc.data();
            data.id = doc.id;
            setDocState({
                isLoading: false,
                data
            });
        });
        
        // on component did unmount unsubscribe from doc.
        return () => unsubscribe();
    }, []);
    
    //return the doc data.
    return [docState.isLoading, docState.data];
};

