import React from 'react';
import styled from 'styled-components';

const ProfilePic = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 32px;
`;

const Avatar = ({ imageSource }) => {
    return <ProfilePic source={imageSource} />
}

export default Avatar;