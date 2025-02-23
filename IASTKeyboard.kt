import android.inputmethodservice.InputMethodService
import android.view.KeyEvent
import android.view.LayoutInflater
import android.view.View
import android.view.inputmethod.InputConnection
import android.widget.Button
import android.widget.LinearLayout

class CustomKeyboardService : InputMethodService() {
    private val keys: Array<Array<String>> = arrayOf(
        arrayOf("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"),
        arrayOf("a", "ā", "i", "ī", "u", "ū", "e", "o", "h", "ḥ"),
        arrayOf("k", "g", "c", "j", "t", "d", "ṭ", "ḍ", "p", "b"),
        arrayOf("n", "ṅ", "ñ", "ṇ", "ṉ", "m", "ṃ", "m̐", "~", "v"),
        arrayOf("s", "ś", "ṣ", "y", "ẏ", "r", "ṛ", "ṝ", "r̤", "ṟ"),
        arrayOf("l", "ḷ", "ḹ", "l̤", "ḻ", "q", "ġ", "z", "f", "k͟h")
    )

    override fun onCreateInputView(): View {
        val keyboardView = LayoutInflater.from(this).inflate(R.layout.keyboard_view, null) as LinearLayout

        for (row in keys) {
            val rowLayout = LinearLayout(this)
            rowLayout.orientation = LinearLayout.HORIZONTAL

            for (key in row) {
                val button = Button(this)
                button.text = key
                button.setOnClickListener { handleKeyPress(key) }
                rowLayout.addView(button)
            }
            keyboardView.addView(rowLayout)
        }

        return keyboardView
    }

    private fun handleKeyPress(key: String) {
        val inputConnection: InputConnection? = currentInputConnection
        inputConnection?.commitText(key, 1)
    }
}
