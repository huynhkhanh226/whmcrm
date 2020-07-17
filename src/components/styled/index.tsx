import styled from "styled-components";

export const TableContainer = styled.div<{height?: number}>`
    height: ${props => {
        if (props.height){
            return  props.height + "px";
        }
        return "calc(100vh - 203px)";
    }};
    overflow: auto;
`;