import styled from 'styled-components';

const blue = '#3f3dc9';

export const ProfileComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ProfileContainer = styled.div`
  width: 70%;
  height: 93vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  overflow: auto;
  padding: 20px 0;
  box-shadow: 0 0 10px black;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
`;

export const ProfileNavigation = styled.div`
  width: 50%;
  margin-top: 20px;

  @media (max-width: 500px) {
    width: 80%;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: lato;
  width: 35%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const ProfileContent = styled.div`
  width: 40%;
  font-family: lato;
  align-self: flex-start;
  display: flex;
  flex-direction: column;

  .select {
    align-self: flex-end;
    margin: 20px 20px;

    @media (max-width: 1024px) {
      width: 50%;
    }

    @media (max-width: 768px) {
      width: 30%;
    }

    @media (max-width: 500px) {
      width: 40%;
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    align-self: center;
  }
`;

export const ProfileOrders = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  overflow: auto;
  align-items: center;
`;

export const ProfilePhoto = styled.img`
  width: 50%;
  height: 20vh;
  min-height: 150px;
  border-radius: 15px;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 50%;
    height: 20vh;
  }
`;

export const ProfileName = styled.p`
  font-weight: bold;
  margin-top: 10px;
`;

export const ProfileEmail = styled.p`
  margin: 5px 0;
`;

export const ProfileLabel = styled.h1`
  margin-left: 20px;
  padding: 0 5px;

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 0 10px;
  }
`;

export const ProfileUploadPhoto = styled.label`
  color: ${blue};
  margin-top: 10px;
  cursor: pointer;
`;

export const ProfileUploadPhotoButton = styled.input`
  display: none;
`;
