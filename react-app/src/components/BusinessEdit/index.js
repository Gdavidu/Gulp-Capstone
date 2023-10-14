import './BusinessEdit.css'
import { useModal } from '../../context/Modal';
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { editBusiThunk } from '../../store/business';

export default function BusinessEdit({ busId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const edit = useSelector(state => Object.values(state.businesses.allBusinesses)).filter(business => business.id === busId)[0];
    const user = useSelector(state => state.session.user)
    const user_id = user.id
    const currentImage = edit.photo_url.split('/').reverse()[0]

    const [errors, setErrors] = useState({})
    const [name, setName] = useState(edit.name)
    const [image, setImage] = useState('')
    const imageTypes = [".pdf", ".png", ".jpeg", ".jpg", ".gif"];
    const [phonenum, setPhonenum] = useState(edit.phone_num)
    const [addr, setAddr] = useState(edit.street_add)
    const [city, setCity] = useState(edit.city)
    const [state, setState] = useState(edit.state)
    const [zip, setZip] = useState(edit.zip)
    const [website, setWebsite] = useState(edit.website_url)
    const [pricerate, setPricerate] = useState(edit.price_rating)
    const [descr, setDescr] = useState(edit.description)
// console.log(image)
    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}
        if (!name) validationErrors.name = 'Please provide a valid name (cannot be blank)'
        // if (!image) validationErrors.image = 'Please provide a valid image (cannot be blank)'
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
        const business = new FormData()
        business.append("name", name)
        business.append("owner_id", user_id)
        business.append("phone_num", phonenum)
        business.append("street_add", addr)
        business.append("city", city)
        business.append("state", state)
        business.append("zip", zip)
        business.append("website_url", website)
        business.append("price_rating", pricerate)
        business.append("description", descr)
        if (typeof image !== 'string') business.append("photo_url",image)


        for (const key of business.keys()) {
            console.log(key);
          }
        for (const value of business.values()) {
            console.log(value);
          }
        try {
            await dispatch(editBusiThunk(business, busId))
            closeModal()
            history.push(`/businesses/${busId}`)
        } catch (error) {
            console.error('Error editing this business:', error)
        }
    }
    const handleImage = async (e) => {
        e.preventDefault();
        const ogBtn = document.getElementById('image-btn')
        ogBtn.click()
        const newBtn = document.getElementById('new-image-btn')
        newBtn.style.display = 'none'
        ogBtn.style.display = 'revert'
    }
    return (
        <div className='bus-edit-div'>
            <h1>Edit Your Business</h1>
            <form id='bus-edit-form' onSubmit={handleSubmit}>
                <section id='bus-data'>
                    <div className='bus-edit-inputs'>
                        <label>
                            Name:
                            <input
                                className='edit-bars'
                                type='text'
                                value={name}
                                maxLength='50'
                                size='30'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>
                    {errors.name && <p className='upload-validators'>{errors.name}</p>}

                    <label className='bus-edit-inputs' >
                                Phone Number:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    value={phonenum}
                                    maxLength='10'
                                    onChange={(e) => setPhonenum(e.target.value)}
                                />
                            </label>

                            {errors.phonenum && <p className='upload-validators'>{errors.phonenum}</p>}

                            <label className='bus-edit-inputs' >
                                Street Address:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    value={addr}
                                    maxLength='50'
                                    onChange={(e) => setAddr(e.target.value)}
                                />
                            </label>

                            {errors.addr && <p className='upload-validators'>{errors.addr}</p>}

                            <label className='bus-edit-inputs' >
                                City:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    value={city}
                                    maxLength='50'
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </label>

                            {errors.city && <p className='upload-validators'>{errors.city}</p>}

                            <label className='bus-edit-inputs' >
                                Zipcode:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    value={zip}
                                    maxLength='5'
                                    onChange={(e) => setZip(e.target.value)}
                                />
                            </label>

                            {errors.zip && <p className='upload-validators'>{errors.zip}</p>}

                            <label className='bus-edit-inputs' >
                                State:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    value={state}
                                    maxLength='20'
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </label>

                            {errors.state && <p className='upload-validators'>{errors.state}</p>}

                            <label className='bus-edit-inputs' >
                                Business's Website URL:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                            </label>

                            {errors.state && <p className='upload-validators'>{errors.state}</p>}

                            <label className='bus-edit-inputs' >
                                <div className='priceRating'>Price Rating:
                                    {[...Array(4)].map((dollar, index) => {
                                        index += 1;
                                        // console.log("INDEX: ", index, "VS ", 'PRICERATE: ', pricerate)
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={index <= pricerate ? "on" : "off"}
                                                id='dollas'
                                                onClick={() => setPricerate(index)}
                                            >
                                                <span className='dollar'><i class="fa fa-solid fa-dollar-sign"></i></span>
                                            </button>
                                        );
                                    })}

                                </div>
                            </label>

                            {errors.pricerate && <p className='upload-validators'>{errors.pricerate}</p>}

                            <label className='bus-edit-inputs' >
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

                    <div className='bus-edit-inputs'>
                        <label>
                            Image:
                            <input
                                className='edit-bars'
                                type='file'
                                // accept='image/*'
                                accept=' .png, .jpg, .jpeg, .gif'
                                id='image-btn'
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <input
                                className='edit-bars'
                                type="button"
                                id="new-image-btn"
                                // value="Choose New File"
                                value={`Replace ${currentImage}`}
                                // onClick={(e)=> document.getElementById('image-btn').click()}
                                onClick={handleImage}
                            />
                        </label>
                    </div>
                    {errors.image && <p className='errors'>{errors.image}</p>}
                </section>
                <div id='edit-bus-btn'>
                <button  className='button-orange' type="submit">Edit Business</button>
                </div>
            </form>
        </div>
    )
}
