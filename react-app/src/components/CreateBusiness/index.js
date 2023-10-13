import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createBusiThunk } from '../../store/business';
import "./CreateBusiness.css"


export default function CreateBusiness() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [phonenum, setPhonenum] = useState('')
    const [addr, setAddr] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [website, setWebsite] = useState('')
    const [pricerate, setPricerate] = useState(0)
    const [descr, setDescr] = useState('')
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false);
    if(!user){
        history.push('/')
        return null
    }

    const user_id = user.id

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}
        const imageTypes = [".pdf", ".png", ".jpeg", ".jpg", ".gif"];
        if (!name) validationErrors.name = 'Please provide a valid name (cannot be blank)'
        if (!image) validationErrors.image = 'Please provide a valid image (cannot be blank)'
        if (!phonenum) validationErrors.phonenum = 'Please provide a valid phone number (cannot be blank)'
        if (isNaN(phonenum)) validationErrors.phonenum = 'Must be a valid 10 digit number'
        if (phonenum.length !== 10) validationErrors.phonenum = 'Must be 10 digits!'
        if (!addr) validationErrors.addr = 'Please provide a valid address (cannot be blank)'
        if (!city) validationErrors.city = 'Please provide a valid city (cannot be blank)'
        if (!state) validationErrors.state = 'Please provide a valid state (cannot be blank)'
        if (!zip) validationErrors.zip = 'Please provide a valid zipcode (cannot be blank)'
        if (!website) validationErrors.website = 'Please provide a valid website (cannot be blank)'
        if (!pricerate) validationErrors.pricerate = 'Please provide a valid price rating (cannot be blank)'
        if (isNaN(pricerate)) validationErrors.pricerate = 'Price rating must be an integer'
        if (!pricerate) validationErrors.pricerate = 'Please choose a price rating!'
        if (!descr) validationErrors.descr = 'A business description is required'
        if (descr.length > 250) validationErrors.descr = 'Business descriptions are limited to 250 characters'
        if (image && !(imageTypes.some(type => {
            return image.name.endsWith(type)
        }))) {
            validationErrors.image = 'Acceptable image files must end in .pdf, .png, .jpg, .jpeg or .gif'
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("owner_id", user_id)
        formData.append("phone_num", phonenum)
        formData.append("street_add", addr)
        formData.append("city", city)
        formData.append("state", state)
        formData.append("zip", zip)
        formData.append("website_url", website)
        formData.append("price_rating", pricerate)
        formData.append("description", descr)
        formData.append("photo_url", image)

        console.log("PHOTO_URL", image)


        try {
            setUploading(true)
            const newBusi = await dispatch(createBusiThunk(formData, user))
            console.log('NEWBUSI:>>>>>',newBusi.photo_url)
            history.push(`/businesses/${newBusi.newBusiness.id}`)
        } catch (error) {
            console.error('Error posting business:', error)
        }
    }


    return (
        <div className='index'>
            <div className='busi-upload-div'>
                <h1>Create a Business</h1>
                <form className='upload-form' encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className='upload-div'>
                        <section id='upload-form-data'>

                            <label className='upload-form-elements' >
                                Name:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    placeholder='Name of your Business'
                                    value={name}
                                    maxLength='100'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>

                            {errors.name && <p className='upload-validators'>{errors.name}</p>}

                            <label className='upload-form-elements' >
                                Phone Number:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    placeholder='ex. 4992335678'
                                    value={phonenum}
                                    maxLength='10'
                                    onChange={(e) => setPhonenum(e.target.value)}
                                />
                            </label>

                            {errors.phonenum && <p className='upload-validators'>{errors.phonenum}</p>}

                            <label className='upload-form-elements' >
                                Street Address:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    placeholder='ex. 12 Gold Way'
                                    value={addr}
                                    maxLength='50'
                                    onChange={(e) => setAddr(e.target.value)}
                                />
                            </label>

                            {errors.addr && <p className='upload-validators'>{errors.addr}</p>}

                            <label className='upload-form-elements' >
                                City:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    placeholder='ex. Los Angeles'
                                    value={city}
                                    maxLength='50'
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </label>

                            {errors.city && <p className='upload-validators'>{errors.city}</p>}

                            <label className='upload-form-elements' >
                                Zipcode:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    placeholder='ex. 91234'
                                    value={zip}
                                    maxLength='5'
                                    onChange={(e) => setZip(e.target.value)}
                                />
                            </label>

                            {errors.zip && <p className='upload-validators'>{errors.zip}</p>}

                            <label className='upload-form-elements' >
                                State:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    placeholder='ex. Oregon'
                                    value={state}
                                    maxLength='20'
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </label>

                            {errors.state && <p className='upload-validators'>{errors.state}</p>}

                            <label className='upload-form-elements' >
                                Business's Website URL:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    placeholder='ex. www.your-website.com'
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                            </label>

                            {errors.state && <p className='upload-validators'>{errors.state}</p>}

                            <label className='upload-form-elements' >
                                <div className='priceRating'>Price Rating:
                                    {[...Array(4)].map((dollar, index) => {
                                        index += 1;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={index <= pricerate ? "on" : "off"}
                                                id='dollas'
                                                onClick={() => setPricerate(index)}
                                            >
                                                {/* <span className="dollar">&#128178;</span> */}
                                                <span className='dollar'><i class="fa fa-solid fa-dollar-sign"></i></span>
                                            </button>
                                        );
                                    })}
                                    {/* <div className='price'>Price Rating</div> */}
                                </div>
                            </label>

                            {errors.pricerate && <p className='upload-validators'>{errors.pricerate}</p>}

                            <label className='upload-form-elements' >
                                Business's Description:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    placeholder='250 character limit'
                                    value={descr}
                                    onChange={(e) => setDescr(e.target.value)}
                                />
                            </label>

                            {errors.descr && <p className='upload-validators'>{errors.descr}</p>}

                            <label className='upload-form-elements' >
                                Image:
                                <input
                                    className='busi-inputs'
                                    type='file'
                                    accept='.pdf, .png, .jpg, .jpeg, .gif'
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </label>

                            {errors.image && <p className='upload-validators'>{errors.image}</p>}

                        </section>
                        <button id='upload-btn' type="submit" className='button-orange'>Create Business</button>
                    </div>
                    {(uploading) && <p className='status-message'>Uploading...</p>}
                </form>
            </div>
        </div>
    )
}
