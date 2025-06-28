import React, {  createContext, ReactNode, useContext, useState } from 'react';

interface AppContextType{
  notificationData:string;
  setNotificationData:(data:string)=>void;
}

interface AppProviderProps{
  children:ReactNode;
}

export const notificationContext=createContext<AppContextType|undefined>(undefined);


export const AppProvider: React.FC<AppProviderProps> = ({children})=>{
  const [notificationData,setNotificationData]=useState<string>("OK")
  return (
    <notificationContext.Provider value={{notificationData,setNotificationData}}>
      {children}
    </notificationContext.Provider>
  );
};

export const useNotification=():AppContextType=>{
  const context=useContext(notificationContext)
  if(!context)
  {
    throw new Error("No notification Context found !!")
  }
  return context;
}