"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDialogActions } from "@/app/hooks/useDialogActions";
import { DataTable } from "@/app/common/DataTable";
import { EditBotDialog } from "../Dialogs/EditBotDialog";
import { DeleteBotDialog } from "../Dialogs/DeleteBotDialog";
import { useGetBot } from "./hooks/useGetBot";
import { useBotColumns } from "./hooks/useBotColumns";
import { useQueryClient } from "@tanstack/react-query";
import { useGridApiRef } from "@mui/x-data-grid";


export const BotList = forwardRef(
  ({ search = null }, ref) => {
    const gridRef = useGridApiRef(null);

    const queryClient = useQueryClient();

    const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

    const [currentBot, setCurrentBot] =
      useState();
    // const [loading, setLoading] = useState(false);

    const { columns } = useBotColumns({
      onAction: (actionType, bot) => {
        onDialogOpen(actionType);
        setCurrentBot(bot);
      },
      // loading,
    });

    const { data, isPending, refetch } = useGetBot();

    // const { getBots } = useGetBotsQueryFn();

    // const getRows = async (params) => {
    //   setLoading(true);

    //   const { bots, totalCount } = await getBots({
    //     body: {
    //       ...params,
    //       quickFilter: filterSearchParams(search),
    //     },
    //   });

    //   let lastRow = -1;

    //   if (bots.length < defaultPageSize) {
    //     lastRow = totalCount;
    //   }

    //   setLoading(false);

    //   if (bots.length === 0) {
    //     gridRef.current?.api.showNoRowsOverlay();
    //   } else {
    //     gridRef.current?.api.hideOverlay();
    //   }

    //   return params.successCallback(botCodes, lastRow);
    // };

    // const dataSource = {
    //   getRows: (params) => {
    //     getRows(params);
    //   },
    // };

    // const onGridReady = useCallback((params) => {
    //   params.api.setGridOption("datasource", dataSource);
    // }, []);

    const refreshCache = () => {
      // queryClient.invalidateQueries(['list']);
      // gridRef.current?.api.refreshInfiniteCache();
      refetch();
    };

    // useEffect(() => {
    //   if (gridRef.current?.api) {
    //     gridRef.current.api.setGridOption("datasource", dataSource);
    //   }
    // }, [search]);

    useImperativeHandle(ref, () => ({
      refreshBotList() {
        refreshCache();
      },
    }));

    const dialogRenderer = {
      edit: currentBot && (
        <EditBotDialog
          open
          onClose={onDialogClose}
          botId={currentBot.id}
          onEditSuccess={refreshCache}
        />
      ),
      delete: currentBot && (
        <DeleteBotDialog
          open
          bot={currentBot}
          onDeleteSuccess={refreshCache}
          onClose={onDialogClose}
        />
      ),
    };

    // if (loading) {
    //   gridRef.current?.api.hideOverlay();
    // }
    return (
      <>
        <DataTable
          ref={gridRef}
          columns={columns}
          rows={data}
          loading={isPending}
        // onGridReady={onGridReady}
        // height="calc(95vh - 160px)"
        />

        {openedDialog && dialogRenderer[openedDialog]}
      </>
    );
  }
);

BotList.displayName = "BotList";
