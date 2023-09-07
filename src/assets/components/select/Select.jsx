import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ComSelect from '@mui/material/Select';
import "./select.scss"


function Select({ values, cat, onchange, selectValue }) {
    const [option, setOption] = React.useState('');

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{cat}</InputLabel>
                <ComSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectValue}
                    label={cat}
                    onChange={onchange}
                >
                    {values.map((value, i) => {
                        return <MenuItem key={i} value={value}>{value + " inch"}</MenuItem>
                    })}
                </ComSelect>
            </FormControl>
        </Box>
    )
}

export default Select