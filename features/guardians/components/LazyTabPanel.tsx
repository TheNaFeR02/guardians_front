import { useEffect, useState } from "react";
import { TabPanel } from "react-tabs";

const LazyTabPanel = (props:any) => {
    const [initialized, setInitialized] = useState(false);
    
    // Only initialize the component when it's selected for the first time
    useEffect(() => {
      if (props.selected && !initialized) {
        // console.log("primera vez y unica")
        setInitialized(true);
        
      }
    }, [props.selected, initialized]);
  
    return <TabPanel forceRender={initialized} {...props} />;
  };
  LazyTabPanel.tabsRole = 'TabPanel';

export default LazyTabPanel