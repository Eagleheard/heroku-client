import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const black = '#000000';
const lato = 'Lato';
const hoverLink = '#1ba8a8';
const primary = '#ffffff';
const lightGreen = '#90EE90';

interface ICard {
  cart?: boolean;
  order?: boolean;
  search?: boolean;
}

export const CardBuyButton = styled.div<ICard>`
  display: ${({ cart, search, order }) => (cart || order || search ? 'none' : 'flex')};
  align-self: flex-end;
  justify-content: flex-end;
  width: 10%;
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s;
`;

export const CardComponent = styled.div<ICard>`
  display: flex;
  flex-direction: ${({ cart, order, search }) => (search || cart || order ? 'row' : 'column')};
  align-items: center;
  justify-self: center;
  border-radius: 10px;
  margin: 10px 0;
  width: ${({ cart, order }) => (cart || order ? '90%' : '100%')};
  box-shadow: ${({ search }) => (search ? 'none' : `0 0 10px ${black};`)}
  background: ${primary};
  text-decoration: none;
  color: ${black};
  ${({ cart, order }) =>
    cart || order
      ? `
    margin: 10px; 
    align-self: center;
  `
      : null}
  ${({ search }) => search && 'justify-content: space-around;'}

  @media (max-width: 1024px) {
    width: 90%;
    margin: 10px;
  }

  @media (max-width: 500px) {
    width: ${({ cart, order }) => (cart || order ? '95%' : '100%')};
  }

  &:hover > ${CardBuyButton} {
    opacity: 1;
    transition: opacity 0.3s;
  }
`;

export const CardImg = styled.img<ICard>`
  border-radius: 25% 10%;
  margin: 10px;
  width: 200px;
  height: 200px;
  cursor: pointer;
  ${({ cart, order }) =>
    cart || order
      ? `
          width: 100px; 
          height: 100px;
        `
      : null}
  ${({ search }) =>
    search &&
    `
      width: 50px;
      height: 50px;
  `}

  @media (max-width: 1024px) {
    width: ${({ cart, order }) => (cart || order ? '100px' : '200px')};
    height: ${({ cart, order }) => (cart || order ? '100px' : '200px')};
    width: ${({ search }) => search && '50px'};
    height: ${({ search }) => search && '50px'};
  }

  @media (max-width: 600px) {
    ${({ search }) => search && `margin: 0;`}
    width: ${({ search }) => (search ? '50px' : '160px')};
    height: ${({ search }) => (search ? '50px' : '160px')};
  }

  @media (max-width: 500px) {
    width: ${({ search }) => (search ? '50px' : '140px')};
    height: ${({ search }) => (search ? '50px' : '140px')};
  }
`;

export const CardDescription = styled.div<ICard>`
  display: flex;
  flex-direction: row;
  font-family: ${lato};
  ${({ cart, order }) =>
    cart || order
      ? `flex-direction: row; 
         justify-content: space-between;
         align-items: flex-start;
         width: 100%;
         height: 15vh;`
      : null}
  ${({ search }) => search && `justify-content: space-between; width: 100%;`}

  @media (max-width: 600px) {
    height: ${({ cart }) => (cart ? '20vh' : '15vh')};
    height: ${({ search }) => search && '5vh'};
  }

  @media (max-width: 500px) {
    height: ${({ order }) => (order ? '20vh' : '15vh')};
    height: ${({ search }) => search && '5vh'};
  }
`;

export const CardMainInformation = styled.div<ICard>`
  display: block;
  ${({ cart }) =>
    cart &&
    `
      display: flex;
      flex-direction: column;
      padding: 10px 0; 
      height: 15vh;
    `}
  ${({ order }) =>
    order &&
    `
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 15vh;
    `}
  
  @media (max-width: 600px) {
    height: ${({ cart }) => (cart ? '20vh' : '15vh')};
  }

  @media (max-width: 500px) {
    height: ${({ order }) => (order ? '20vh' : '15vh')};
  }
`;

export const CardPaymentInformation = styled.div<ICard>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 5px;
`;

export const CardPriceInformation = styled.div<ICard>`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardAdditionalInformation = styled.div<ICard>`
  display: ${({ order }) => (order && 'none') || 'flex'};
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: ${({ cart }) => (cart ? '13vh' : '100%')};

  @media (max-width: 600px) {
    height: ${({ cart }) => (cart ? '20vh' : '15vh')};
  }

  @media (max-width: 500px) {
    height: ${({ order }) => (order ? '20vh' : '5vh')};
    height: ${({ cart }) => (cart ? '13vh' : '5vh')};
  }
`;

export const CardQuantity = styled.p<ICard>`
  font-family: ${lato};
  margin-top: auto;
  font-size: 14px;
  padding: 0 10px;
`;

export const CardQuantityValue = styled.div<ICard>`
  display: flex;
  flex-direction: row;
  margin-top: auto;
`;

export const OrderTotalPrice = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  align-self: flex-end;
  width: 35%;

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

export const CardParagraph = styled.p<ICard>`
  font-size: 14px;
  font-family: ${lato};
  padding: ${({ cart, order }) => (cart || order ? '0' : '0 7px')};

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

export const CardLabel = styled(CardParagraph)<ICard>`
  font-weight: bold;
`;

export const CardPrice = styled(CardLabel)<ICard>`
  text-decoration: line-through;
`;

export const CardDiscount = styled(CardLabel)<ICard>`
  background-color: ${lightGreen};
  align-self: center;
  font-family: ${lato};
  margin-right: 5px;
`;

export const CardNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${black};

  &:hover {
    color: ${hoverLink};
  }
`;

export const CardNavLinkToCart = styled(CardNavLink)`
  text-decoration: underline;
`;

export const CardGenre = styled.p<ICard>`
  ${({ search }) => search && `display: none;`}
  font-size: 14px;
  padding: 10px;

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

export const CardAuthor = styled.p<ICard>`
  ${({ search }) => search && `display: none;`}
  font-size: 14px;
  padding: 10px;
  text-decoration: none;
  color: ${black};

  @media (max-width: 500px) {
    font-size: 12px;
  }

  &--link {
    text-decoration: none;
    color: ${black};

    &:hover {
      color: ${hoverLink};
    }
  }
`;
