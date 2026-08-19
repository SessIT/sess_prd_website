// import { useEffect, useRef, useState } from 'react';
// import { createPortal } from 'react-dom';
// import designVideo from '../assets/Video/design services.mp4';

// function VideoTest() {
//   const [isOpen, setIsOpen] = useState(false);

//   const modalRef = useRef(null);
//   const scrollPositionRef = useRef(0);

//   /*
//    * ======================================================
//    * MODAL OPEN / CLOSE EFFECT
//    * ======================================================
//    */
//   useEffect(() => {
//     if (!isOpen) return;

//     // Save the exact page scroll position
//     scrollPositionRef.current = window.scrollY;

//     const previousOverflow = document.body.style.overflow;

//     // Prevent background page scrolling
//     document.body.style.overflow = 'hidden';

//     // Close with Escape key
//     const handleEscape = (event) => {
//       if (event.key === 'Escape') {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener('keydown', handleEscape);

//     return () => {
//       // Restore page scrolling
//       document.body.style.overflow = previousOverflow;

//       // Restore exact scroll position
//       requestAnimationFrame(() => {
//         window.scrollTo({
//           top: scrollPositionRef.current,
//           behavior: 'instant',
//         });
//       });

//       window.removeEventListener('keydown', handleEscape);
//     };
//   }, [isOpen]);

//   /*
//    * ======================================================
//    * CLOSE MODAL
//    * ======================================================
//    */
//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   /*
//    * ======================================================
//    * FULLSCREEN
//    * ======================================================
//    */
//   const openFullscreen = async () => {
//     try {
//       if (modalRef.current?.requestFullscreen) {
//         await modalRef.current.requestFullscreen();
//       }
//     } catch (error) {
//       console.error('Fullscreen failed:', error);
//     }
//   };

//   /*
//    * ======================================================
//    * MODAL
//    * ======================================================
//    */
//   const modal = isOpen ? (
//     <div
//       className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4"
//       role="dialog"
//       aria-modal="true"
//       aria-label="Design services video"
//       onClick={(event) => {
//         // Close only when clicking the backdrop
//         if (event.target === event.currentTarget) {
//           closeModal();
//         }
//       }}
//     >
//       <div
//         ref={modalRef}
//         className="relative w-full max-w-5xl overflow-hidden bg-black shadow-2xl"
//         style={{
//           aspectRatio: '16 / 9',
//           maxHeight: '85vh',
//         }}
//         onClick={(event) => event.stopPropagation()}
//       >
//         {/* =================================================
//             VIDEO
//         ================================================== */}
//         <video
//           src={designVideo}
//           title="Design Services Video"
//           className="h-full w-full object-contain"
//           controls
//           autoPlay
//           playsInline
//         />

//         {/* =================================================
//             TOP RIGHT CONTROLS
//         ================================================== */}
//         <div className="absolute right-3 top-3 z-20 flex gap-2">
//           {/* Fullscreen */}
//           <button
//             type="button"
//             onClick={openFullscreen}
//             className="rounded-md bg-black/75 px-3 py-2 text-sm font-semibold text-white transition hover:bg-black"
//           >
//             Full screen
//           </button>

//           {/* Close */}
//           <button
//             type="button"
//             onClick={closeModal}
//             className="flex h-10 w-10 items-center justify-center rounded-full bg-black/75 text-2xl text-white transition hover:bg-black"
//             aria-label="Close video"
//           >
//             ×
//           </button>
//         </div>
//       </div>
//     </div>
//   ) : null;

//   /*
//    * ======================================================
//    * MAIN PAGE
//    * ======================================================
//    */
//   return (
//     <>
//       <section
//         className="bg-white px-5 py-10 sm:px-8 lg:px-12"
//         aria-label="Design services video"
//       >
//         <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
//           Videos
//         </h2>

//         <div className="flex flex-wrap gap-6">
//           {/* =================================================
//               VIDEO PREVIEW CARD
//           ================================================== */}
//           <button
//             type="button"
//             onClick={() => setIsOpen(true)}
//             className="group relative block overflow-hidden rounded-xl bg-black shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-400"
//             style={{
//               width: 'min(400px, 100%)',
//               aspectRatio: '1 / 1',
//             }}
//             aria-label="Play Design Services Video"
//           >
//             {/* Preview Video */}
//             <video
//               src={designVideo}
//               className="h-full w-full object-cover"
//               preload="metadata"
//               muted
//               playsInline
//               aria-hidden="true"
//             />

//             {/* Overlay */}
//             <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25 text-white transition group-hover:bg-black/35">
//               {/* Play Button */}
//               <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/95 pl-1 text-4xl shadow-xl transition duration-300 group-hover:scale-110">
//                 ▶
//               </span>

//               {/* Title */}
//               <span className="text-center text-lg font-bold drop-shadow-md">
//                 Watch Design Services Video
//               </span>
//             </span>
//           </button>
//         </div>
//       </section>

//       {/* Modal */}
//       {modal && createPortal(modal, document.body)}
//     </>
//   );
// }

// export default VideoTest;

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import designVideo from '../assets/Video/design services.mp4';

function VideoTest() {
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef(null);
  const scrollPositionRef = useRef(0);

  /*
   * ======================================================
   * MODAL OPEN / CLOSE
   * ======================================================
   */
  useEffect(() => {
    if (!isOpen) return;

    // Save the exact scroll position
    scrollPositionRef.current = window.scrollY;

    const previousOverflow = document.body.style.overflow;

    // Prevent background page scrolling
    document.body.style.overflow = 'hidden';

    // Close with Escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      // Restore page scrolling
      document.body.style.overflow = previousOverflow;

      // Restore the exact position where video was opened
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: 'instant',
        });
      });

      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  /*
   * ======================================================
   * CLOSE MODAL
   * ======================================================
   */
  const closeModal = () => {
    setIsOpen(false);
  };

  /*
   * ======================================================
   * FULLSCREEN
   * ======================================================
   */
  const openFullscreen = async () => {
    try {
      if (modalRef.current?.requestFullscreen) {
        await modalRef.current.requestFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen failed:', error);
    }
  };

  /*
   * ======================================================
   * VIDEO MODAL
   * ======================================================
   */
  const modal = isOpen ? (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Design services video"
      onClick={(event) => {
        // Only clicking the backdrop closes the modal
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      {/* ==================================================
          RESPONSIVE VIDEO CONTAINER
          ================================================== */}
      <div
        ref={modalRef}
        className="
          relative
          w-full
          max-w-5xl
          overflow-hidden
          bg-black
          shadow-2xl
          aspect-video
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* ==================================================
            VIDEO
            ================================================== */}
        <video
          src={designVideo}
          title="Design Services Video"
          className="h-full w-full object-contain"
          controls
          autoPlay
          playsInline
        />

        {/* ==================================================
            TOP RIGHT CONTROLS
            ================================================== */}
        <div className="absolute right-2 top-2 z-20 flex items-center gap-2 sm:right-3 sm:top-3">
          {/* Fullscreen */}
          <button
            type="button"
            onClick={openFullscreen}
            className="
              rounded-md
              bg-black/75
              px-2.5
              py-1.5
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-black
              sm:px-3
              sm:py-2
              sm:text-sm
            "
          >
            Full screen
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={closeModal}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-black/75
              text-xl
              text-white
              transition
              hover:bg-black
              sm:h-10
              sm:w-10
              sm:text-2xl
            "
            aria-label="Close video"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  ) : null;

  /*
   * ======================================================
   * PAGE
   * ======================================================
   */
  return (
    <>
      <section
        className="bg-white px-5 py-10 sm:px-8 lg:px-12"
        aria-label="Design services video"
      >
        {/* Section Heading */}
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
          Videos
        </h2>

        <div className="flex flex-wrap gap-6">
          {/* ==================================================
              VIDEO PREVIEW CARD
              ================================================== */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="
              group
              relative
              block
              overflow-hidden
              rounded-xl
              bg-black
              shadow-xl
              focus:outline-none
              focus:ring-4
              focus:ring-cyan-400
            "
            style={{
              width: 'min(400px, 100%)',
              aspectRatio: '1 / 1',
            }}
            aria-label="Play Design Services Video"
          >
            {/* Preview Video */}
            <video
              src={designVideo}
              className="h-full w-full object-cover"
              preload="metadata"
              muted
              playsInline
              aria-hidden="true"
            />

            {/* Dark Overlay */}
            <span
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                gap-4
                bg-black/25
                text-white
                transition
                group-hover:bg-black/35
              "
            >
              {/* Play Button */}
              <span
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-cyan-500/95
                  pl-1
                  text-4xl
                  shadow-xl
                  transition
                  duration-300
                  group-hover:scale-110
                "
              >
                ▶
              </span>

              {/* Video Title */}
              <span className="px-4 text-center text-lg font-bold drop-shadow-md">
                Watch Design Services Video
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* ====================================================
          PORTAL
          ==================================================== */}
      {modal && createPortal(modal, document.body)}
    </>
  );
}

export default VideoTest;