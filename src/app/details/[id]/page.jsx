"use client";
import 'react-toastify/dist/ReactToastify.css';
import classes from './details.module.css';
import React, { useEffect, useState } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import Image from 'next/image';
import ReviewModal from '@/components/reviewModal/ReviewModal';
import ReviewCard from '@/components/reviewCard/ReviewCard';
import { useDispatch } from 'react-redux';
import { addBook } from '@/app/redux/cartSlice';
import { toast, ToastContainer } from 'react-toastify';


const Details = (ctx) => {
    const id = ctx.params.id;
    const URL = `https://openlibrary.org/works/${id}.json`;
    const dispatch = useDispatch();
    const [book, setBook] = useState({});
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const price = ((book?.pages / 100) * 5).toFixed(2);

    const sanitizeDescription = (description) => {
        if (!description) {
            return 'No description available.';
        }
        if (typeof description === 'string') {
            return description;
        }
        if (description.value) {
            return description.value;
        }
        return 'No description available.';
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(URL);
                const data = await res.json();

                let pages = data.pagination ? parseInt(data.pagination.split(' ')[0], 10) : 350;
                if (isNaN(pages)) {
                    pages = 350; // Default page count if not available
                }

                const description = sanitizeDescription(data.description);

                const details = {
                    title: data.title,
                    desc: description,
                    id: data.key.split('/')[2],
                    cover_image: data.covers
                        ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
                        : '/placeholder.jpg', // Placeholder image if no cover image is available
                    pages
                };

                setBook(details);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDetails();
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/review?bookId=${id}`);
                const data = await res.json();

                setReviews(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchReviews();
    }, [id]);

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    const handleAddToCart = () => {
        dispatch(addBook({
            ...book,
            quantity: 1,
            price
        }));

        // Show notification
        toast.success('Book added to cart successfully!', {
            position: 'top-center',
            autoClose: 5000, // Auto close the notification after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.bookDetails}>
                    <div className={classes.left}>
                        {book?.cover_image ? (
                            <Image
                                src={book.cover_image}
                                height={750}
                                width={350}
                                alt="Book cover"
                            />
                        ) : (
                            <Image
                                src="/placeholder.jpg" // Make sure you have a placeholder image in the public directory
                                height={750}
                                width={350}
                                alt="Placeholder image"
                            />
                        )}
                    </div>
                    <div className={classes.right}>
                        <h1 className={classes.title}>
                            {book?.title}
                        </h1>
                        <p className={classes.desc}>
                            {book?.desc?.slice(0, 750)}
                        </p>
                        <div className={classes.section}>
                            <span className={classes.price}>
                                Price: ₹{price}
                            </span>
                            <span className={classes.book_pages}>
                                Pages: {book?.pages}
                            </span>
                        </div>
                        <div className={classes.section}>
                            <button onClick={handleAddToCart} className={classes.cart}>
                                Add to Cart
                                <BsFillCartFill />
                            </button>
                            <button onClick={handleShowModal} className={classes.reviewButton}>
                                Review Book
                            </button>
                        </div>
                        {showModal && (
                            <ReviewModal
                                handleHideModal={handleHideModal}
                                bookId={book?.id}
                            />
                        )}
                    </div>
                </div>
                <div className={classes.reviews}>
                    {reviews?.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                        />
                    ))}
                </div>
            </div>
            <ToastContainer /> {/* Place ToastContainer here */}
        </div>
    );
};

export default Details;