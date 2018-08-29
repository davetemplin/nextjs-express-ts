export interface RecordNameProps {
    id: number;
    name: string;
    title?: string;
    dark?: boolean;
    className?: string;
}

export default (props: RecordNameProps) => (<span className={props.className}>{props.name}&nbsp;<span className={`badge badge-pill ${props.dark ? 'badge-dark' : 'badge-secondary'}`}>{props.id}</span></span>);