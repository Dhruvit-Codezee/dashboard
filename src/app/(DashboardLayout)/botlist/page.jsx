'use client'

import { useRef } from 'react';
import { Box } from '@mui/material';
import { Button } from '@/app/common/Button';
import { useQueryClient } from '@tanstack/react-query';
import { AddBotDialog } from '@/app/component/botlist/Dialogs/AddBotDialog';
import { BotList } from '@/app/component/botlist/BotList/BotList';
import { useDialogActions } from '@/app/hooks/useDialogActions';

export default function Page() {

  const botListRef = useRef(null);

  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();
  const queryClient = useQueryClient();


  const dialogRenderer = {
    add: (
      <AddBotDialog
        open
        onClose={onDialogClose}
        onAddSuccess={() =>
          // botListRef.current?.refreshBotList()
          queryClient.invalidateQueries(['list'])
        }
      />
    ),
  };

  return <>

    {/* <Botlist /> */}

    <Box display="flex" justifyContent="flex-end" marginBottom={2}>

      <Button variant="contained" color="primary" onClick={() => onDialogOpen("add")} >

        Add New Bot

      </Button>

    </Box>

    <BotList ref={botListRef} search='' />

    {openedDialog && dialogRenderer[openedDialog]}

  </>;
}
