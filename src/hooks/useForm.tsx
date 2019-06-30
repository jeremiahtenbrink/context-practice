import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';


export const useForm = ( callback: () => any ): [any, (e: ChangeEvent) => void, (e: FormEvent) => void] => {
    const initState: { [ name: string ]: any } = {};
    const [ values, setValue ] = useState( initState );
    
    const handleSubmit: ( event: FormEvent<HTMLFormElement> ) => void = ( e ): void => {
        if ( e ) {
            e.preventDefault();
        }
        callback();
    };
    
    const handleChange: ( event: ChangeEvent<any> ) => void = ( e ) => {
        e.persist();
        setValue( ( values: any ) => {
            return { ...values, [ e.target.name ]: e.target.value }
        } )
    };
    
    return [ values, handleChange, handleSubmit ];
    
};
