// import React from 'react';
// import Loader from 'components/Loader'

// const LoadingDiv = styled('div')<{ $display?: boolean }>`
//   position: fixed;
//   left: 50%;
//   top: 50%;
//   z-index: 100;

//   display: ${({ $display }) => ($display ? 'block' : 'none')};
//   opacity: 1;
// `

// const Popup: React.FC = () => {

//     const error = useUserError()
//   const [open, setOpen] = useState(false)
//   const [loading, setIsLoading] = useState(false)

//   // adding wishList Item
//   const wishListAdding = useWishListLoading()
//   // wishList Item adding success
//   const wishListAddingSuccess = useWishListAddingSuccess()
//   useEffect(() => {
//     error?.hasError || wishListAddingSuccess?.success ? setOpen(true) : setOpen(false)
//     setIsLoading(wishListAdding)

//   }, [wishListAdding, wishListAddingSuccess, error])
//   // add Nft Id Tto user white list
//   const addToWishList = (nftId: number) => addtoWishlist(nftId)    

//   // clear error state + close Error dialogue
//   const onDismiss = () => {
//     if (error) {
//       dispatch(clearError())
//     }
//     if (wishListAddingSuccess && wishListAddingSuccess.success) {
//       dispatch(clearSuccess())
//     }
//   }

//   // clear any dialogue if user leave the page with out closing
//   setTimeout(() => {
//     onDismiss()
//   }, 1500)

//   let dialogue
//   if (error) {
//     dialogue = <ErrorDialogue message={error?.message} />
//   }

//   //show
//   if (wishListAddingSuccess && wishListAddingSuccess?.success) {
//     dialogue = <SuccessDialogue dismiss={onDismiss} message={wishListAddingSuccess?.message} />
//   }

//   return 
//   <Modal isOpen={open} onDismiss={onDismiss} maxHeight={150}>
//   {}
// </Modal>
// ;
// };

// export default Popup;

{/* <LoadingDiv $display={loading}>
<Loader size='40px'></Loader>
</LoadingDiv> */}

