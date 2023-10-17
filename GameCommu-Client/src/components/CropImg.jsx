/* eslint-disable react/prop-types */
import Cropper from 'react-easy-crop';
import { useState } from 'react';
import { Modal,Spinner,Button,Form } from 'react-bootstrap';
import { useUploadProfileImgMutation,useCountProfileImgQuery,useEditProfileImgMutation } from '../store';
import { useCallback } from 'react';
import getCroppedImg from './CropImageFunc';
import * as formik from 'formik';
import * as yup from 'yup';
import { userApi } from '../store/apis/userApi';
import { postApi } from '../store/apis/postApi';
import { postByGameApi } from '../store/apis/postByGameApi';
import { imageApi } from '../store/apis/imageApi';
import { commentApi } from '../store/apis/commentApi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

function CropImg(props) {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [showCrop,setShowCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [spin, setSpin] = useState(false);
  const [uploadProfileImg] = useUploadProfileImgMutation();
  const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
  const ALLOWED_FILE_TYPES = ['image/png','image/jpg','image/jpeg'];
  const [fileObjectURL, setFileObjectURL] = useState(null);
  const {isFetching,data} = useCountProfileImgQuery(props.uid);
  const [updateProfileImg] = useEditProfileImgMutation();

  const imageValidation = yup.object().shape({
    images: yup.array()
    .of(
    yup.mixed()
        .required('กรุณาอัพโหลดรูป')
        .test(
        'fileSize',
        'ขนาดไฟล์ต้องน้อยกว่า 8MB',
        (value) => value && value.size <= MAX_FILE_SIZE 
        )
        .test(
        'fileType',
        'รองรับไฟล์ PNG, JPG, หรือ JPEG เท่านั้น',
        (value) =>
            value &&
            ALLOWED_FILE_TYPES.includes(value.type)
        )
    ),
  });
  const onCropChange = (crop) => {
    setCrop(crop)
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])


  const onZoomChange = (zoom) => {
    setZoom(zoom)
  }

  let cropImg;
  if(isFetching){
    cropImg = <Skeleton height={460}/>
  }else{
    cropImg =
      <Cropper
        image={fileObjectURL}
        crop={crop}
        zoom={zoom}
        aspect={1}
        cropShape="round"
        showGrid={false}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onZoomChange={onZoomChange}
      />

  }

  const showCroppedImage = async () =>{
    setSpin(true);
    if(fileObjectURL){
      try {
        const croppedImageFile = await getCroppedImg(
          fileObjectURL,
          croppedAreaPixels,
        )
        if(data === -1){
          await uploadProfileImg(croppedImageFile);
        }else{
          await updateProfileImg(croppedImageFile);
        }
       
        dispatch(userApi.util.resetApiState());
        dispatch(postByGameApi.util.resetApiState());
        dispatch(postApi.util.resetApiState());
        dispatch(commentApi.util.resetApiState());
        dispatch(imageApi.util.resetApiState());
        setShowCrop(false);
        URL.revokeObjectURL(fileObjectURL);
        toast.success('อัพโหลดรูปสำเร็จ', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        });
        props.onHide();
      } catch (e) {
        console.error(e)
      }
    }else{
      console.log('noImg');
    }
    setSpin(false);
  }

  const handleSubmitImg = (value) => {
    if(value.images.length > 0){
      setShowCrop(true)
      setFileObjectURL(URL.createObjectURL(value.images[0]));
    }
  }
  


  return (
    <Modal  
        show={props.show}
        centered
        scrollable
      >
      <Modal.Body>
        {!showCrop? 
        <Formik
          initialValues = {{
              images: [],
          }}
            validationSchema={imageValidation}
            onSubmit={handleSubmitImg}
            validateOnChange={false}
        >
        {({handleSubmit, setFieldValue,values, errors}) => (
          <Form noValidate onSubmit={handleSubmit} className="w-100">
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Upload รูปภาพ</Form.Label>
              <Form.Control 
                  disabled={spin}
                  as="input"
                  type="file"
                  name="images"
                  onChange={(event) => {
                    const filesArray = [...event.target.files];
                    setFieldValue('images', filesArray);
                  }}
                  isInvalid={!!errors.images}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.images}
              </Form.Control.Feedback>
            </Form.Group> 
            <Button 
              className="w-25 mr-3" 
              variant="secondary"
              disabled={spin}
              type='submit'
            >
              อัพโหลดภาพ
            </Button>
          </Form>
        )}
        </Formik>
        
        :
        <div style={{minHeight:'50vh'}}>
          {cropImg}
        </div>
        }  
      </Modal.Body>
      <Modal.Footer>
          <div className="d-flex justify-content-end mt-3 w-100">
            <Button 
              className="w-25 mr-3" 
              variant="secondary"
              onClick={()=>{
                setShowCrop(false);
                URL.revokeObjectURL(fileObjectURL);
                props.onHide();
              }}
              disabled={spin}
            >
              ยกเลิก
            </Button>
            <Button 
              className="w-25 mr-3" 
              variant="secondary"
              onClick={showCroppedImage}
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