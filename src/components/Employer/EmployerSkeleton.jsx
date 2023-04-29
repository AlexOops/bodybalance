import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import s from "./Employer.module.scss"

export const EmployerSkeleton = () => {
    //

    return (

            <Stack spacing={1}>
                <div className={s.card}>

                    <div className={s.skeleton}>
                        <div className={`${s.img}`}>
                            <Skeleton variant="circular" width={200} height={200} sx={{ bgcolor: 'rgba(237, 207, 253, 0.4)' }}/>
                        </div>

                        <div className={s.skeletonTitle}>
                            <Skeleton variant="text" width="80%" height={45} sx={{ bgcolor: 'rgba(237, 207, 253, 0.4)', margin: '0 auto' }}/>
                        </div>

                        <Skeleton variant="text" width="100%" height={30} sx={{ bgcolor: 'rgba(237, 207, 253, 0.4)' }}/>
                        <Skeleton variant="text" width="100%" height={30} sx={{ bgcolor: 'rgba(237, 207, 253, 0.4)' }}/>
                        <Skeleton variant="text" width="100%" height={30} sx={{ bgcolor: 'rgba(237, 207, 253, 0.4)' }}/>
                    </div>


                    <Skeleton variant="text" width="35%" height={42} sx={{ bgcolor: 'rgba(237, 207, 253, 0.4)' }}/>
                </div>
            </Stack>

    );
}