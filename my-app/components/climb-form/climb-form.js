'use client'

import { useState } from "react";
import { Input, Select, Button } from "@chakra-ui/react";
import { createClient } from '@/utils/supabase/client'

export default function ClimbForm({ user , session_id}) {
    const supabase = createClient()
    const grades = [
        "V0-", "V0", "V0+", "V1-", "V1", "V1+", "V2-", "V2", "V2+", "V3-", "V3", "V3+",
        "V4-", "V4", "V4+", "V5-", "V5", "V5+", "V6-", "V6", "V6+", "V7-", "V7", "V7+",
        "V8-", "V8", "V8+", "V9-", "V9", "V9+", "V10-", "V10", "V10+", "V11-", "V11",
        "V11+", "V12-", "V12", "V12+", "V13-", "V13", "V13+", "V14-", "V14", "V14+",
        "V15-", "V15", "V15+", "V16-", "V16", "V16+", "V17-", "V17"
    ];
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [notes, setNotes] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const { error } = await supabase
                .from('climbs')
                .insert([{
                    name: name,
                    grade: grade,
                    notes: notes,
                    creator: user?.id,
                    session: session_id,
                }])
            if (error) throw error
        } catch (error) {
            alert('Error Logging Climb')
        }

    }

    return (
        <form id='climb-form' onSubmit={onSubmit}>
            <label>Climb Name: </label>
            <Input colorScheme='teal' name='name' placeholder='Type here...' onChange={(e) => setName(e.target.value)} />
            <label>Climb Grade: </label>
            <Select colorScheme='teal' name='grade' onChange={(e) => setGrade(e.target.value)}>
                {grades.map((grade, index) => (
                    <option key={index} value={grade}>
                        {grade}
                    </option>
                ))}
            </Select>
            <label>Climb Notes: </label>
            <Input colorScheme='teal' name='notes' placeholder='Type here...' onChange={(e) => setNotes(e.target.value)} />
            <Button colorScheme='teal' type='submit'>Add Climb</Button>
        </form>
    );
}
