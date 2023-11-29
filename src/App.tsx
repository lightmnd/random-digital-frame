import { useEffect, useRef, useState } from "react";
import "./App.css";


function App() {
  // const handle: FullScreenHandle = useFullScreenHandle();
  const url = import.meta.env.VITE_UNSPLASH_BASE_API_URL
  const [imgUrl, setImgUrl] = useState<string>("")
  const [photographerName, setPhotographerName] = useState<string>("")
  // const [isFullScreen, setIsFullScreen] = useState<boolean>(false)


  const randomizeImg = async () => {

    const res = await fetch(`${url}/photos/random/?topics=animals&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&orientation=landscape`)
    const data = await res.json()
    setImgUrl(data?.urls?.regular)
    setPhotographerName(data?.user?.name)
    // }
  }

  useEffect(() => {
    randomizeImg()
    setInterval(async () => {
      randomizeImg()
    }, (3000 * 100)) // every 5 minutes
  }, []);

  const containerRef = useRef(null);


  const documentForBrowserFullScreenFunctions = document.documentElement as HTMLElement & {
    requestFullscreen(): Promise<void>
    mozCancelFullScreen(): Promise<void>
    webkitExitFullscreen(): Promise<void>
    msExitFullscreen(): Promise<void>
  }

  const documentForBrowserExitFullScreenFunctions = document.documentElement as HTMLElement & {
    exitFullscreen(): Promise<void>
  }


  const handleFullScreenRequest = () => {
    const container = containerRef.current;

    if (container) {
      if (documentForBrowserFullScreenFunctions.requestFullscreen) {
        documentForBrowserFullScreenFunctions.requestFullscreen();
        // } else if (documentForBrowserFullScreenFunctions.mozRequestFullScreen) {
        //   documentForBrowserFullScreenFunctions.mozRequestFullScreen();
        // } else if (documentForBrowserFullScreenFunctions.webkitRequestFullscreen) {
        //   documentForBrowserFullScreenFunctions.webkitRequestFullscreen();
        // } else if (documentForBrowserFullScreenFunctions.msRequestFullscreen) {
        //   documentForBrowserFullScreenFunctions.msRequestFullscreen();
      }
    }
  };

  const handleFullScreenExit = () => {
    // if (documentForBrowserExitFullScreenFunctions.fullscreenElement) {
    if (documentForBrowserExitFullScreenFunctions.exitFullscreen) {
      documentForBrowserExitFullScreenFunctions.exitFullscreen();
      // } else if (documentForBrowserExitFullScreenFunctions.mozCancelFullScreen) {
      //   documentForBrowserExitFullScreenFunctions.mozCancelFullScreen();
      // } else if (documentForBrowserExitFullScreenFunctions.webkitExitFullscreen) {
      //   documentForBrowserExitFullScreenFunctions.webkitExitFullscreen();
      // } else if (documentForBrowserExitFullScreenFunctions.msExitFullscreen) {
      //   documentForBrowserExitFullScreenFunctions.msExitFullscreen();
      // }
    }
  };

  // const checkIfFullScreen = () => {
  //   setIsFullScreen(!!document.fullscreenElement || document.fullscreenEnabled)
  //   console.log(document.fullscreenEnabled)
  // }


  useEffect(() => {
    // Attach the event listener to a button, for example
    const img = document.getElementById('image-container');

    if (img) {
      img.addEventListener('click', handleFullScreenRequest);
      console.log(img)
    }

    if (img) {
      img.addEventListener('dblclick', handleFullScreenExit);
    }

    // Exit fullscreen on component unmount
    return () => {
      handleFullScreenExit();
      if (img) {
        img.removeEventListener('click', handleFullScreenRequest);
      }
    };
  }, []);

  return (
    <div className="container">
      <img ref={containerRef} id="image-container" src={imgUrl} alt="" />
      <span className="photographer-name">{photographerName}</span>
      {/* <p>Fullscreen is {isFullScreen ? 'active' : 'inactive'}.</p> */}
    </div>
  );

}
export default App;
