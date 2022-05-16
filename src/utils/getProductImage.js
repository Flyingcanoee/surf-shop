import board1 from '../assets/boards/board1.webp';
import board2 from '@/assets/boards/board2.webp';
import board3 from '@/assets/boards/board3.webp';
import board4 from '@/assets/boards/board4.webp';
import board5 from '@/assets/boards/board5.webp';
import board6 from '@/assets/boards/board6.webp';
import board7 from '@/assets/boards/board7.webp';
import board8 from '@/assets/boards/board8.webp';
import board9 from '@/assets/boards/board9.webp';
import board10 from '@/assets/boards/board10.webp';
import board11 from '@/assets/boards/board11.webp';
import board12 from '@/assets/boards/board12.webp';
import board13 from '@/assets/boards/board13.webp';
import board14 from '@/assets/boards/board14.webp';
import board15 from '@/assets/boards/board15.webp';

let boards = [
  board1,
  board2,
  board3,
  board4,
  board5,
  board6,
  board7,
  board8,
  board9,
  board10,
  board11,
  board12,
  board13,
  board14,
  board15
];
const getProductImage = function () {
  let randomPicture = Math.floor(Math.random() * 15);

  return boards[randomPicture];
};

export default getProductImage;
