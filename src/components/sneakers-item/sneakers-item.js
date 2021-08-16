import React, {useContext} from "react";
import { useSelector, useDispatch} from 'react-redux';
import { fetchAddCartItem } from '../../actions';
import { Link } from "react-router-dom";
import "./sneakers-item.scss";
import { Button, ButtonGroup, Typography, Tooltip, Zoom } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ShopIcon from "@material-ui/icons/Shop";
import FavoriteSharpIcon from "@material-ui/icons/FavoriteSharp";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AuthContext from '../../auth-context';
import Storage from '../../storage';

const StyledButton = withStyles({
  root: {
    backgroundColor: "black",
    color: "white",
  }
})(Button);

const styleButtonGroup = {
    position: 'absolute',
    left: 'center',
    bottom: '10px',
};

export const SneakersItem = ({
  sneak,
  onLikeButtonClick,
  isLoggedIn,
  snikersCartApi
}) => {
  const {name, liked, price, id, img, male} = sneak;
  const dispatch = useDispatch();
  const cartLoading = useSelector(state => state.cartLoading);
  const cartError = useSelector(state => state.cartError);
  const likedStorage = new Storage(`likedSnikers`, window.localStorage);

  const isLiked = liked
    ? <FavoriteSharpIcon style={{ color: "#fff" }} />
    : <FavoriteBorderIcon style={{ color: "#fff" }} />;

  const linkHref = `/${male}/${id}`;

  const cartButtonClickHandler = () => {
    if (cartLoading) {
      return;
    }
    if (isLoggedIn) {
      fetchAddCartItem(dispatch, snikersCartApi, sneak); 
    } else {
      return;
    }
  };

  const likeButtonHandler = () => {
    onLikeButtonClick(id);

    if (liked) {
      likedStorage.removeLikedSniker(id);
    } else {
      likedStorage.setLikedSniker(id, {...sneak, liked: !liked});
    }       
  }

  const cartButtonTitle = !cartError ? (isLoggedIn 
  ? (!cartLoading ? 'Добавить в корзину' : 'Добавляем в корзину') 
  : 'Добавить в корзину можно только после авторизации') : 'Ошибка загрузки';

  const likeButtonTitle = !liked ? "Добавить в избранное" : "Убрать из избранного";

  return (
    <>
      <Link to={linkHref}>
        <img
          className="sneakers-img"
          src={img}
          width="202"
          height="152"
          alt="sneak"
        />
      </Link>
      <Link to={linkHref} style={{textDecoration: 'none'}}>
        <Typography variant="h6" align="center" 
        style={{color: 'black', maxWidth: "250px", marginBottom: '50px'}}>
          {name}
        </Typography>
      </Link>
      <ButtonGroup style={styleButtonGroup} variant="contained" disableRipple size="large">
        <Tooltip TransitionComponent={Zoom} 
        title={cartButtonTitle}
        placement="top">
        <StyledButton
          variant="contained"
          style={{backgroundColor: '#000'}}
          startIcon={<ShopIcon />}
          onClick={cartButtonClickHandler}
        >
          {price.split(" ").join("")}P
        </StyledButton>
        </Tooltip>
        
        <Tooltip TransitionComponent={Zoom} 
        title={likeButtonTitle}
        placement="top">
        <StyledButton
          variant="contained"
          style={{backgroundColor: '#000'}}
          onClick={likeButtonHandler}
        >
          {isLiked}
        </StyledButton>
        </Tooltip>
      </ButtonGroup>
    </>
  );
};
