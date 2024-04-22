import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchData} from '../service/DataFetching';
import chevronRight from "../assets/Prevas-Entre-Portal-UI-assets/SVG/chevron_right.svg";
import chevronLeft from "../assets/Prevas-Entre-Portal-UI-assets/SVG/chevron_left.svg";

interface Product {
    id: number;
    title: string;
    subtitle: string;
    customerSide: string;
    prevasSide: string;
    contact?: string;
    imageUrls: string[];
}
interface ProductDetailScreenProps {
    product?: Product;
    onClose: () => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ product, onClose }) => {
    const { id } = useParams<{ id: string }>();
    const [localProduct, setLocalProduct] = useState<Product | undefined>(product);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!product && id) {
                try {
                    const fetchedProduct: Product = await fetchData(`/product/${id}`);
                    setLocalProduct(fetchedProduct);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };

        fetchProduct();
    }, [id, product]);

    if (!localProduct) {
        return <div>Loading...</div>;
    }

    const handlePreviousImage = () => {
        setCurrentImageIndex(prevIndex =>
            prevIndex === 0 ? localProduct.imageUrls.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prevIndex =>
            (prevIndex + 1) % localProduct.imageUrls.length
        );
    };

    const getImageSrc = (imagePath: string) => {
        return imagePath.startsWith('http') ? imagePath : `${import.meta.env.VITE_API_BASE_URL}/images/${imagePath}`;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h1 className="productDetail-title">{localProduct.title}</h1>
                <img
                    className="modal-image"
                    src={getImageSrc(localProduct.imageUrls[currentImageIndex])}
                    alt={`${localProduct.title} ${currentImageIndex + 1}`}
                />
                <div className="content-image-container">
                    {localProduct.imageUrls.length > 1 && (
                        <>
                            <button className="navigation-button left" onClick={handlePreviousImage}>
                                <img src={chevronLeft} alt="Previous" />
                            </button>
                            <button className="navigation-button right" onClick={handleNextImage}>
                                <img src={chevronRight} alt="Next" />
                            </button>
                        </>
                    )}
                </div>
                <div className="modal-text-content">
                    <p className="productDetail-info">{localProduct.subtitle}</p>
                    <p className="productDetail-info">{localProduct.customerSide}</p>
                    <p className="productDetail-info">{localProduct.prevasSide}</p>
                    {localProduct.contact && <p className="productDetail-info">Contact: {localProduct.contact}</p>}
                </div>
                <button className='quiz-button' onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ProductDetailScreen;