/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form  from 'react-bootstrap/Form';
import { useAddPostMutation,useUploadPostImgMutation,useFetchGameOfUserQuery,setData } from '../store';
import * as formik from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { postByGameApi } from '../store/apis/postByGameApi';
import { postApi } from '../store/apis/postApi';
import { useNavigate } from 'react-router-dom';

function Post({ show,onHide,modalFormRef,gid }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, isFetching } = useFetchGameOfUserQuery();
    const [ post ] = useAddPostMutation();
    const [ uploadPostImg ] = useUploadPostImgMutation();
    const { Formik } = formik;
    const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
    const ALLOWED_FILE_TYPES = ['image/png','image/jpg','image/jpeg'];
    const [selectedValue, setSelectedValue] = useState(false); 
    const [spin, setSpin] = useState(false); 

    let optionGame;
    let dataGame = [];

    if(isFetching){
        optionGame = 
            <option>
                loading.............
            </option>
    }else{
        optionGame = data?.map( (data) => {
            dataGame.push(data);
            return <option value={data.gid} key={data.gid} >{`${data.name} (${data.year})`}</option>
        })
    }

    const imageSchema = yup.object().shape({
        textA: yup.string().required('กรุณาพิมพ์ข้อความ'),
        game: yup.object().shape({
            gid: yup.number(),
            name: yup.string(),
            year: yup.string()
        }).required('กรุณาเลือกเกม'),
        images: yup.array()
        .of(
        yup.mixed()
            .required('Please select an image')
            .test(
            'fileSize',
            'ขนาดไฟล์ต้องน้อยกว่า 8MB',
            (value) => value && value.size <= MAX_FILE_SIZE 
            )
            .test(
            'fileType',
            'รองรับไฟล์ JPEG , PNG, JPG, หรือ GIF เท่านั้น',
            (value) =>
                value &&
                ALLOWED_FILE_TYPES.includes(value.type)
            )
        ),
    });

    const handleSubmit = async (e) => {
        let postData;
        if(gid){
            const selectedGameData  = dataGame.find( item =>  item.gid === parseInt(gid))
            postData = {
                gameName: selectedGameData.name,
                gameYear: selectedGameData.year,
                detail: e.textA
            }
        }else{
            
            postData = {
                gameName: e.game.name,
                gameYear: e.game.year,
                detail: e.textA
            }
        }   
        const postResult = await post(postData);
        if(e.images.length > 0){
            await e.images.forEach( async image => {
                const images = {
                    file:image,
                    pid:postResult.data
                }
                await uploadPostImg(images);
            });

        }
        dispatch(setData([]));
        dispatch(postByGameApi.util.resetApiState());
        dispatch(postApi.util.resetApiState());
        setSpin(false);
        setSelectedValue(false);
        onHide()
    }

    return (
        <Formik
            initialValues = {{
                textA:'',
                game:{
                    gid: -1,
                    name: '',
                    year: ''
                },
                images: [],
            }}
            validationSchema={imageSchema}
            onSubmit={(values)=>{
                if(values.game.gid > -1){
                    setSpin(true)
                    handleSubmit(values)
                }
                if(gid){
                    setSpin(true)
                    handleSubmit(values)
                }
            }}
            validateOnChange={false}
            innerRef={modalFormRef}
        >
            {({handleSubmit, setFieldValue,values, errors}) => (
                <Modal
                show={show}
                onHide={()=>{
                    setSelectedValue(false);
                    setSpin(false);
                    onHide();
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            สร้างโพสต์
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate onSubmit={handleSubmit} className='d-flex flex-column'>
                            <Form.Group className="mb-3" controlId="textArea">
                                <Form.Control 
                                    as="textarea" 
                                    name="textA" 
                                    placeholder='พิมข้อความ' 
                                    rows={4}
                                    value={values.textA}
                                    onChange={(event) => {
                                        setFieldValue('textA',event.target.value)
                                    }}
                                    isInvalid={!!errors.textA} 
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.textA}
                                </Form.Control.Feedback>
                           </Form.Group>
                           {!gid? <Form.Group className="mb-3" controlId="game">
                                    <Form.Select 
                                        name="game" 
                                        value={values.game?.gid}
                                        onChange={(event) => {
                                            const selectedGame = dataGame.find( item =>  item.gid === parseInt(event.target.value));
                                            setFieldValue('game', selectedGame);
                                            setSelectedValue(true)
                                        }}
                                        isInvalid={!!errors.game}
                                    >
                                        {selectedValue ? null : <option>กรุณาเลือกเกม</option>}
                                        {optionGame}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.game}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                :null
                            }
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Upload รูปภาพ</Form.Label>
                                <Form.Control 
                                    as="input"
                                    type="file"
                                    name="images"
                                    onChange={(event) => {
                                        const filesArray = [...event.target.files];
                                        setFieldValue('images', filesArray);
                                    }}
                                    isInvalid={!!errors.images}
                                    multiple 
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.images}
                                </Form.Control.Feedback>
                            </Form.Group> 
                            <Button style={{width:'20%'}} className='mt-2 mb-2 align-self-end' variant='outline-secondary' type='submit'>
                                {!spin? "โพสต์":                                    
                                    <Spinner style={{height:'1.4rem',width:'1.4rem'}} animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                }
                            </Button>
                        </Form>                                   
                    </Modal.Body>               
                </Modal>
            )} 
        </Formik>
    );
}

export default Post;