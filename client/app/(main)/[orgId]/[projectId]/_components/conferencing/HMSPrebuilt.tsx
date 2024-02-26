
// import HMSPrebuilt component from Roomkit package
import { HMSPrebuilt} from '@100mslive/roomkit-react';

// add pre-built component
function HMSPrebuiltComponent() {
    return (
        <div style={{ height: "100vh", width:'100%' }}>
            <HMSPrebuilt roomCode="mfp-nazz-puk"  logo={{url:'https://utfs.io/f/5c44d7fe-474e-4238-a1e1-d74360faeba4-rhubvl.svg'}}/>
        </div>
    );
 }

 export default HMSPrebuiltComponent;
