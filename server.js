const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 4000;

app.get('/restart-anydesk', (req, res) => {
  console.log(`[${new Date().toISOString()}] Restarting AnyDesk...`);

  exec("echo 'Attr4ct!f' | sudo -S systemctl restart anydesk-attractif--client", (err, stdout, stderr) => {
    if (err) {
      console.error('Error restarting AnyDesk:', stderr);
      return res.status(500).send(`
        <html><body style="font-family:sans-serif;padding:20px;background:#1a1a1a;color:#ff4444;">
          <h3>❌ Failed to restart AnyDesk</h3>
          <pre>${stderr || err.message}</pre>
          <p style="color:#888;font-size:12px;">Make sure the Node app runs with sufficient privileges (sudo or as root).</p>
        </body></html>
      `);
    }

    console.log('AnyDesk restarted successfully.');
    res.send(`
      <html><body style="font-family:sans-serif;padding:20px;background:#1a1a1a;color:#44ff88;">
        <h3>✅ AnyDesk restarted successfully</h3>
        <p style="color:#888;font-size:12px;">Timestamp: ${new Date().toISOString()}</p>
      </body></html>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Hit http://localhost:${PORT}/restart-anydesk to restart AnyDesk`);
});
