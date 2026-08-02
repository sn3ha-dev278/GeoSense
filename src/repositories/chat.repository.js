import pool from "../db/db.js";

export async function createChatSession(userId){
    const query = `INSERT INTO chat_sessions(user_id)
    VALUES ($1)
    RETURNING *;`

    const result = await pool.query(query,[userId])
    return result.rows[0]
}

export async function getUserChatSessions(userId) {
    const query = `SELECT id, title, created_at, updated_at FROM chat_sessions 
    WHERE user_id = $1 
    ORDER BY updated_at DESC;`

    const result = await pool.query(query,[userId])
    return result.rows
}

export async function getChatSession(sessionId, userId) {
    const query = ` SELECT * FROM chat_sessions
    WHERE id = $1
    AND user_id = $2;`

    const result = await pool.query(query, [sessionId, userId]);
    return result.rows[0]
}

export async function updateChatTitle(sessionId, userId, title) {
    const query = `
        UPDATE chat_sessions
        SET
            title = $3,
            updated_at = NOW()
        WHERE id = $1
        AND user_id = $2
        RETURNING *;`

    const values = [sessionId, userId, title];
    const result = await pool.query(query, values);
    return result.rows[0];
}

export async function deleteChatSession(sessionId, userId) {
    const query = `
        DELETE FROM chat_sessions
        WHERE id = $1 AND user_id = $2
        RETURNING *;`

    const result = await pool.query(query, [sessionId, userId]);
    return result.rows[0];
}