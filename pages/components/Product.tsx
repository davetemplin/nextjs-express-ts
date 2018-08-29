import RecordName from './RecordName';

interface ProductProps {
    id: number;
    name: string;
    title?: string;
    image?: boolean;
};

export default (props: ProductProps) => {
    let name;
    if (props.title)
        name = (
            <span className="d-inline-block">
                <RecordName {...props} className="d-block" />
                <small className="text-dark text-truncate d-inline-block" style={{maxWidth: '200px'}} title={props.title}>{props.title}</small>
            </span>                
        );
    else
        name = <RecordName {...props} className="d-block" />;

    if (props.image)
        return (
            <div>
                <div className="d-inline-block mr-1" style={{width: '30px'}}>
                    <a href={imageUrl(props.id, 220)} target="_blank">
                        <img src={imageUrl(props.id, 50)}  style={{width: '30px', marginTop: '-30px'}} className="product-image-thumbnail" />
                    </a>
                </div>
                {name}
            </div>
        );
    else
        return name;
};

function imageUrl(id: number, size=50) {
    return `https://wwwassets.pricespider.com/product_static/${size}/${id.toString().substring(0, id.toString().length - 3)}/${id}.jpg`;
}