import uniqid from 'uniqid';
import ProptTypes from 'prop-types';
import { StyledImage } from '../styles/Image.styled';
import { Flex } from '../styles/Flex.styled';

const Watermark = ({ id, n }) => {
  const list = [];
  const customStyle = {
    listStyleType: 'none',
  };
  let i = 0;
  while (i < n) {
    const custom = {
      transform: `rotate(${Math.floor(Math.random() * 180)}deg)`,
    };
    list.push(
      <li key={uniqid()} style={customStyle}>
        <StyledImage
          key={uniqid()}
          style={custom}
          src='/img/chaplain.png'
          alt=''
        />
      </li>
    );
    i++;
  }

  return <Flex id={id}>{list}</Flex>;
};

Watermark.propTypes = {
  id: ProptTypes.string,
  n: ProptTypes.number,
};

export default Watermark;
