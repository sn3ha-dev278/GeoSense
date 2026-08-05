import pool from "../db/db.js"

export async function saveMessage(sessionId, sender, message){
    const query = `INSERT INTO chat_messages(session_id, sender,message) VALUES($1, $2, $3) RETURNING *`

    const values = [sessionId, sender, message]
    const result = await pool.query(query, values)
    return result.rows[0]
}

export async function getMessages(sessionId){
    const query = `
        SELECT id, sender, message, created_at
        FROM chat_messages
        WHERE session_id = $1
        ORDER BY created_at ASC;
    `;

    const result = await pool.query(query, [sessionId]);

    return result.rows;
}

export async function deleteMessages(sessionId){
    const query = `DELETE FROM chat_messages WHERE session_id = $1`
    await pool.query(query, [sessionId])
}