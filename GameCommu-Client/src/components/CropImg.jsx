import Cropper from 'react-easy-crop';
import { useState } from 'react';
import { Modal,Spinner,Button } from 'react-bootstrap';

function CropImg(props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [spin, setSpin] = useState(false);

  const onCropChange = (crop) => {
    setCrop(crop)
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedAreaPixels.width / croppedAreaPixels.height)
  }

  const onZoomChange = (zoom) => {
    setZoom(zoom)
  }

  const handleSubmit = () =>{

  }

  return (
    <Modal  
      {...props}
      centered
      scrollable
      >
      <Modal.Body>
      <Cropper
          image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
      </Modal.Body>
      <Modal.Footer>
          <div className="d-flex justify-content-end mt-3 w-100">
            <Button 
              className="w-25 mr-3" 
              variant="secondary"
              onClick={handleSubmit}
              disabled={spin}
            >
              {!spin? "ตกลง":                                    
                  <Spinner style={{height:'1.4rem',width:'1.4rem'}} animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                  </Spinner>
              }
            </Button>
          </div>
      </Modal.Footer>
    </Modal>
  )
}
export default CropImg;