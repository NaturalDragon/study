    function Title(props){
        const {name}=props
        return <div>{name}1</div>
    }
    export default{
        Component:Title,
        getProps(props){
            const {name}=props
            return {name}
        }
    }