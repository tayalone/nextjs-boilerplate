import { lbHover, p, pHover } from '../../config/color';
const styles = theme => ({
  dialogBody: {
    width: theme.spacing.unit * 70
  },
  closeDiv: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  likeDialogBody: {
    width: theme.spacing.unit * 70
  },
  reactionDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  reactionIcon: {
    width: 50,
    height: 50
  },
  selectedReaction: {
    border: `2px solid ${lbHover}`
  },
  likeDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: `${p} !important`,
    '&:hover': {
      color: `${pHover} !important`
    }
  }
});

export default styles;
