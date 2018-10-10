import { lbHover } from '../../config/color';
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
  }
});

export default styles;
