// import { createContext, useState } from "react";


// export const LanguageContext = createContext({});
// const LanguageProvider =(props)=>{

//     const fr = {
//         recepteur: "recepteur",
//         motif: "motif",
//         date_initiation: "Date initiateur",
//         actions: "Action",
//         status: "status",
//     }

//     const en = {
//         recepteur: "Receiver",
//         motif: "Motifs",
//         date_initiation: "Initiation date",
//         actions:"Actions",
//         status:"status",
//     }


//     const [lang, setLang] = useState(fr);
//     const handleLanguage=(newLang)=>{
//         setLang(newLang);
//     }

    

//     return(
//         <LanguageContext.Provider value={{lang, handleLanguage}}>
//             {props.children}
//         </LanguageContext.Provider>
//     )
// }


// export default LanguageProvider;