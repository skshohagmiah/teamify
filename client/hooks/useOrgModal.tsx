import { create } from 'zustand'


interface useOrgModalProps{
  isOpen:boolean,
  onOpen:() => void,
  onClose:() => void
}

export const useOrgModal = create<useOrgModalProps>((set) => ({
 isOpen:false,
 onOpen:() => set({isOpen:true}),
 onClose:() => set({isOpen:false})
}))